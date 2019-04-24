
  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."ISSUES_ISSDEV" BEFORE UPDATE OF "ISSDC", "ISSDEV" ON "VACOLS_TEST"."ISSUES" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW   WHEN (old.issdc = 'V' or new.issdc = 'V') BEGIN

if :old.issdev is null then
  :new.issdev := 'Y';
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."ISSUES_ISSDEV" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."HEARSCHED_INSERT" BEFORE INSERT ON VACOLS_TEST.HEARSCHED               REFERENCING NEW AS NEW OLD AS OLD FOR EACH ROW




DECLARE
  dummy NUMBER;
BEGIN
  IF INSERTING THEN
    SELECT hearsched_pkseq.NEXTVAL
      INTO dummy
      FROM DUAL;
   :new.hearing_pkseq := dummy;
  END IF;
END;







/
ALTER TRIGGER "VACOLS_TEST"."HEARSCHED_INSERT" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."BRIEFF_BFSO_UPD" AFTER
UPDATE OF bfso ON "VACOLS_TEST"."BRIEFF" FOR EACH ROW

BEGIN

if :old.bfso <> :new.bfso and :old.bfso <> '?' then
  INSERT into ATRAIL
	(AUDTABLE,
	AUDCOLUMN,
	AUDACTION,
	AUDAPPEALID,
	AUDOLDVAL,
	AUDNEWVAL,
	AUDUSER,
	AUDTIME)
  VALUES
       ('BRIEFF',
	'BFSO',
	'UPDATE',
	:new.bfcorlid,
	:old.bfso,
	:new.bfso,
	USER,
	SYSDATE);
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."BRIEFF_BFSO_UPD" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."BRIEFF_TBREADY" BEFORE INSERT OR UPDATE OF "BFDTBREADY", "BFTBIND" ON "VACOLS_TEST"."BRIEFF" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW
BEGIN

if :old.bftbind is null and :new.bftbind is not null then
  :new.bfdtbready := SYSDATE;
end if;

if :new.bftbind is null then
  :new.bfdtbready := null;
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."BRIEFF_TBREADY" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."REP_INSERT" BEFORE INSERT ON "VACOLS_TEST"."REP" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW

BEGIN


:new.repaddtime := SYSDATE;


END;
/
ALTER TRIGGER "VACOLS_TEST"."REP_INSERT" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."SOC_ATTID" BEFORE UPDATE OF "SOCATTID", "SOCATTID2" ON "VACOLS_TEST"."SOC" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW   WHEN (old.socattid >= '000' and old.socattid <= '999') BEGIN

if :old.socattid <> :new.socattid then
  :new.socattid2 := :old.socattid;
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."SOC_ATTID" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."FOLDER_ECA" BEFORE
UPDATE OF "TISUBJ1" ON "VACOLS_TEST"."FOLDER" FOR EACH ROW BEGIN

if :old.tisubj1 = 'Y' and (:new.tisubj1 is null or :new.tisubj1 = 'N') then
  :new.tiddue := SYSDATE;
end if;

if :new.tisubj1 ='Y' then
  :new.tiddue := null;
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."FOLDER_ECA" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."COVA_CMRDATE" BEFORE
INSERT
OR UPDATE OF "CVJMR" ON "VACOLS_TEST"."COVA" FOR EACH ROW BEGIN

if :old.cvjmr is null and :new.cvjmr is not null then
  :new.cvjmrdate := SYSDATE;
end if;

if :new.cvjmr is null then
  :new.cvjmrdate := null;
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."COVA_CMRDATE" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."BRIEFF_DVDATES" BEFORE UPDATE OF "BFCURLOC", "BFDCFLD3", "BFDDRO", "BFDDVIN", "BFDDVOUT", "BFDDVWRK", "BFDLOOUT" ON "VACOLS_TEST"."BRIEFF" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW
BEGIN

-- if :new.bfcurloc in ('90' , '89', '98') and :old.bfddvin is null then
--  :new.bfddvin := :new.bfdloout;
-- end if;

if :new.bfddro is not null then
  :new.bfdcfld3 := 'Y';
end if;

END;
/
ALTER TRIGGER "VACOLS_TEST"."BRIEFF_DVDATES" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."ADTIME_MODIFY" BEFORE UPDATE OF "AD113NOREC", "ADCASEDIST", "ADCASEINTAKE", "ADDOR", "ADIHP", "ADMODTIME", "ADMODUSER", "ADSPECPTS", "ADSTAFKEY", "ADTASC", "ADTRANSPG", "ADWEEK", "SPECPTSDESCP" ON "VACOLS_TEST"."ADMINTIME" REFERENCING OLD AS OLD NEW AS NEW FOR EACH ROW
BEGIN

:new.admoduser := USER;
:new.admodtime := SYSDATE;

END;
/
ALTER TRIGGER "VACOLS_TEST"."ADTIME_MODIFY" ENABLE;


  CREATE OR REPLACE TRIGGER "VACOLS_TEST"."BRIEFF_DELETE" BEFORE
DELETE ON VACOLS_TEST.BRIEFF FOR EACH ROW

DECLARE
domuser varchar2(16);

BEGIN

 select sys_context( 'userenv', 'os_user' ) into domuser from dual;

  INSERT into ATRAIL
    (AUDTABLE,
    AUDCOLUMN,
    AUDACTION,
    AUDAPPEALID,
    AUDOLDVAL,
    AUDNEWVAL,
    AUDUSER,
    AUDTIME)
  VALUES
       ('BRIEFF',
    'ROW',
    'DELETE',
    :old.bfcorlid,
    'APPEAL DELETED',
    'APPEAL DELETED',
    DOMUSER,
    SYSDATE);

END;
/
ALTER TRIGGER "VACOLS_TEST"."BRIEFF_DELETE" ENABLE;

