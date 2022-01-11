/*disable warnings*/

SET sql_notes = 0;

/*table creations*/

CREATE TABLE IF NOT EXISTS employees (
    empId int NOT NULL,
    empName varchar(60) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    designation varchar(30) NOT NULL,
    phNo bigint(10) NOT NULL UNIQUE,
    pwd varchar(500) NOT NULL,
    PRIMARY KEY (empId)
);


CREATE TABLE IF NOT EXISTS initiatives (
    initId int NOT NULL AUTO_INCREMENT,
    initName varchar(100) NOT NULL,
    initDesc varchar(500) NOT NULL,
    initStatus varchar(25) NOT NULL,
    initDate DATE,
    progress int DEFAULT 0,
    PRIMARY KEY (initId)
);

ALTER TABLE initiatives AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS contributions (
    contributionId int NOT NULL AUTO_INCREMENT,
    contributedBy int NOT NULL,
    contributedFor int NOT NULL,
    contributionDesc varchar(500) NOT NULL,
    contributedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (contributionId),
    FOREIGN KEY (contributedBy) REFERENCES employees(empID),
    FOREIGN KEY (contributedFor) REFERENCES initiatives(initID)
);

ALTER TABLE contributions AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS reviews (
    reviewId int NOT NULL AUTO_INCREMENT,
    reviewedBy int NOT NULL,
    reviewedFor int NOT NULL,
    rating int NOT NULL,
    comment varchar(500) NOT NULL,
    PRIMARY KEY (reviewId),
    FOREIGN KEY (reviewedBy) REFERENCES employees(empID),
    FOREIGN KEY (reviewedFor) REFERENCES contributions(contributionID)
);

ALTER TABLE reviews AUTO_INCREMENT=1;


CREATE TABLE IF NOT EXISTS subscriptions (
    subBy int NOT NULL,
    subFor int NOT NULL,
    subDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (subBy, subFor),
    FOREIGN KEY (subBy) REFERENCES employees(empID),
    FOREIGN KEY (subFor) REFERENCES initiatives(initID)
);


/*enable warnings*/

SET sql_notes = 1; 