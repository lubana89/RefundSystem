

CREATE TABLE RefundCase (
RefundCase_Id INT AUTO_INCREMENT PRIMARY KEY,
Seller_Id INT NOT NULL,
RefundCaseDetail Text,
RefundCaseStatus Text,
RefundCaseStatusKey Text,
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
RefundCase_Id INT PRIMARY KEY,
Seller_Id INT,
Generation_Time Text,
CaseLink Text,
IsActive TinyInt default 1,
FOREIGN KEY (Seller_Id) REFERENCES Seller(Seller_Id) ON DELETE CASCADE
       ON UPDATE CASCADE,
FOREIGN KEY (RefundCase_Id) REFERENCES RefundCase(RefundCase_Id)ON DELETE CASCADE
       ON UPDATE CASCADE
)

CREATE TABLE CaseMessages (
       CaseMessage_Id INT AUTO_INCREMENT PRIMARY KEY,
       RefundCase_Id INT,
       From_name Text,
       Seller_Id INT NOT NULL,
       Message Text,
       DateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (RefundCase_ID) REFERENCES RefundCase(RefundCase_ID)
)
