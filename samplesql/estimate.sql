SELECT
 	(reltuples/relpages) * (pg_relation_size(16433) /(current_setting('block_size')::integer))
FROM pg_class 
where relname = 'Test_NaklTitleR';

select pg_relation_size(16433);

select count(*) from public."Test_NaklTitleR";

create or replace function estimate_receipt_count() returns int8 as
$$
declare
	res int8;
begin
	select
 		(reltuples/relpages) * (pg_relation_size(16433) /(current_setting('block_size')::integer))
	from pg_class 
	where 
		relname = 'Test_NaklTitleR'
	into res;
	
	return res;
end;
$$ language plpgsql;