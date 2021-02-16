-- list of receipt (by receipt id) content

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
;