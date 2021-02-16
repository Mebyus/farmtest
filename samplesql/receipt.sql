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