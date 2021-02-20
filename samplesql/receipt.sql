-- list of receipts

select
	receipt."NaklTitleRID" as receipt_id,
	count(receipt."NaklTitleRID") as posCount,
	receipt."CreateDate" as sellDate,
	branch_office."Branch",
	doc."DocType",
	sum(details."UQuantity") as sumQuantity,
	sum(details."SumRoznWNDS") as totalSum
from public."Test_NaklTitleR" receipt
left join public."Branch" branch_office on branch_office."BranchID" = receipt."BranchID" 
left join public."Test_NaklDataR" details on details."NaklTitleRID" = receipt."NaklTitleRID"
left join public."DocType" doc on doc."DocTypeID" = receipt."DocTypeID"
where
	receipt."Disable" <> '1' and
	receipt."IsPost" = '1'
group by
	receipt_id,
	selldate,
	branch_office."Branch",
	doc."DocType" 
order by
	sellDate desc
;

create or replace function all_receipts_json() returns text as
$$
declare
	res text;
begin
	select json_agg(r) from (
		select
			receipt."NaklTitleRID" as "id",
			count(receipt."NaklTitleRID") as "posCount",
			receipt."CreateDate" as "createDate",
			branch_office."Branch" as "branch",
			doc."DocType" as "docType",
			sum(details."UQuantity") as "sumQuantity",
			sum(details."SumRoznWNDS") as "sumRoznWNDS"
		from public."Test_NaklTitleR" receipt
		left join public."Branch" branch_office on branch_office."BranchID" = receipt."BranchID" 
		left join public."Test_NaklDataR" details on details."NaklTitleRID" = receipt."NaklTitleRID"
		left join public."DocType" doc on doc."DocTypeID" = receipt."DocTypeID"
		where
			receipt."Disable" <> '1' and
			receipt."IsPost" = '1'
		group by
			"id",
			"createDate",
			"branch",
			"docType"
		order by
			"createDate" desc
	) r into res;
	return res;
end;
$$ language plpgsql;

create or replace function receipts_json(
	page int4 = null,
	psize int2 = null
) returns text as
$$
declare
	res text;
begin
	select json_agg(r) from (
		select
			receipt."NaklTitleRID" as "id",
			count(receipt."NaklTitleRID") as "posCount",
			receipt."CreateDate" as "createDate",
			branch_office."Branch" as "branch",
			doc."DocType" as "docType",
			sum(details."UQuantity") as "sumQuantity",
			sum(details."SumRoznWNDS") as "sumRoznWNDS"
		from public."Test_NaklTitleR" receipt
		left join public."Branch" branch_office on branch_office."BranchID" = receipt."BranchID" 
		left join public."Test_NaklDataR" details on details."NaklTitleRID" = receipt."NaklTitleRID"
		left join public."DocType" doc on doc."DocTypeID" = receipt."DocTypeID"
		where
			receipt."Disable" <> '1' and
			receipt."IsPost" = '1'
		group by
			"id",
			"createDate",
			"branch",
			"docType"
		order by
			"createDate" desc
		limit psize
		offset (page - 1) * psize
	) r into res;
	return res;
end;
$$ language plpgsql;

select all_receipts_json();