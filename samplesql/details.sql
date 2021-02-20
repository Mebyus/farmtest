-- list of receipt (by receipt id) content

select json_agg(r) from ( 
select
	drug."Drug",
	manufacturer."Fabr",
	drug_form."Form",
	details."UQuantity" as posCount,
	details."SumRoznWNDS" as posSum,
	details."NDS",
	parcel."SrokG" as expirationDate
from public."Test_NaklDataR" details
left join public."Test_NaklData" parcel on parcel."NaklDataID" = details."NaklDataID"
left join public."Test_Registry" registry on registry."RegID" = parcel."RegID"
left join public."Test_Form" drug_form on drug_form."FormID" = registry."FormID"
left join public."Test_Fabr" manufacturer on manufacturer."FabrID" = registry."FabrID"
left join public."Test_Drug" drug on drug."DrugID" = registry."DrugID"
where
	details."NaklTitleRID" = 159070459 and -- receipt id goes here
	details."Disable" <> '1'
) r;

create or replace function public.receipt_details_json(id int8) returns text as
$$
declare
	res text;
begin 
select json_agg(r) from ( 
	select
		drug."Drug" as "drug",
		manufacturer."Fabr" as "fabr",
		drug_form."Form" as "form",
		details."UQuantity" as "quantity",
		details."SumRoznWNDS" as "sumRoznWNDS",
		details."NDS" as "nds",
		parcel."SrokG" as "srokG"
	from public."Test_NaklDataR" details
	left join public."Test_NaklData" parcel on parcel."NaklDataID" = details."NaklDataID"
	left join public."Test_Registry" registry on registry."RegID" = parcel."RegID"
	left join public."Test_Form" drug_form on drug_form."FormID" = registry."FormID"
	left join public."Test_Fabr" manufacturer on manufacturer."FabrID" = registry."FabrID"
	left join public."Test_Drug" drug on drug."DrugID" = registry."DrugID"
	where
		details."NaklTitleRID" = id and
		details."Disable" <> '1'
	) r into res;
	return res;
end;
$$ language plpgsql;

select public.receipt_details_json(159070459);