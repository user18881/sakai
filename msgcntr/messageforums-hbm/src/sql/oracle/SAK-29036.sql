CREATE TABLE MFR_RANK_INDIVIDUAL_T (
  RANK_ID NUMBER(19,0) NOT NULL,
  USER_ID VARCHAR2(99) NOT NULL,
  PRIMARY KEY (RANK_ID,USER_ID)
);

ALTER TABLE MFR_RANK_INDIVIDUAL_T ADD CONSTRAINT FK_MFR_RANK_INDIVIDUAL FOREIGN KEY (RANK_ID) REFERENCES MFR_RANK_T (ID);

CREATE TABLE TMP_DIGITS (DIGIT NUMBER(1));

INSERT INTO TMP_DIGITS VALUES (0);
INSERT INTO TMP_DIGITS VALUES (1);
INSERT INTO TMP_DIGITS VALUES (2);
INSERT INTO TMP_DIGITS VALUES (3);
INSERT INTO TMP_DIGITS VALUES (4);
INSERT INTO TMP_DIGITS VALUES (5);
INSERT INTO TMP_DIGITS VALUES (6);
INSERT INTO TMP_DIGITS VALUES (7);
INSERT INTO TMP_DIGITS VALUES (8);
INSERT INTO TMP_DIGITS VALUES (9);

CREATE TABLE TMP_SEQUENCE (SEQ NUMBER(3));

INSERT INTO TMP_SEQUENCE (
  SELECT D1.DIGIT + D2.DIGIT * 10
  FROM TMP_DIGITS D1 CROSS JOIN TMP_DIGITS D2
);

INSERT INTO MFR_RANK_INDIVIDUAL_T (RANK_ID, USER_ID)
(
  SELECT R.ID,  M.USER_ID
  FROM TMP_SEQUENCE S
    CROSS JOIN MFR_RANK_T R
    INNER JOIN SAKAI_USER_ID_MAP M
      ON TRIM(SUBSTR(';'||R.ASSIGNTO||';' ,  INSTR(';'||R.ASSIGNTO || ';', ';', 1, S.SEQ) + 1, INSTR(';'||R.ASSIGNTO || ';', ';', 1, S.SEQ+1)- INSTR(';'||R.ASSIGNTO || ';', ';', 1, S.SEQ)-1)) = M.EID
  WHERE S.SEQ BETWEEN 1 AND ( 1 + LENGTH(R.ASSIGNTO) - LENGTH(REPLACE(R.ASSIGNTO, ';', '')))
);

ALTER TABLE MFR_RANK_T  DROP COLUMN ASSIGNTODISPLAY;
ALTER TABLE MFR_RANK_T  DROP COLUMN ASSIGNTO;

DROP TABLE TMP_DIGITS;
DROP TABLE TMP_SEQUENCE;
