CREATE TABLE Seller (
Seller_Id INT AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(50),
address VARCHAR(250)
)

CREATE TABLE RefundCase (
RefundCase_Id INT AUTO_INCREMENT PRIMARY KEY,
Seller_Id INT NOT NULL,
RefundCaseDetail Text,
FOREIGN KEY (Seller_Id) REFERENCES Seller(Seller_Id)
ON DELETE CASCADE
       ON UPDATE CASCADE
)

CREATE TABLE Reason (
Reason_Id INT AUTO_INCREMENT PRIMARY KEY,
Reason Text
)
CREATE TABLE Wish (
Wish_Id INT AUTO_INCREMENT PRIMARY KEY,
Wish Text
)
CREATE TABLE ItemCondition (
ItemCondition_Id INT AUTO_INCREMENT PRIMARY KEY,
ItemCondition Text
)

CREATE TABLE CaseLinks (
RefundCase_ID INT,
Seller_Id INT,
Generation_Time Text,
CaseLink Text,
IsActive TinyInt default 1,
FOREIGN KEY (Seller_Id) REFERENCES Seller(Seller_Id) ON DELETE CASCADE
       ON UPDATE CASCADE,
FOREIGN KEY (RefundCase_ID) REFERENCES RefundCase(RefundCase_ID)ON DELETE CASCADE
       ON UPDATE CASCADE
)


delete from caselinks

