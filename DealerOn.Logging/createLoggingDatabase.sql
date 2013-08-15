/*DROP DATABASE collector;
drop table Exception;
drop table LogEntry;
drop table RequestInfo;
drop table LogLevel;*/

CREATE DATABASE collector;


CREATE TABLE RequestInfo
(
        Id                      int                     NOT NULL PRIMARY KEY AUTO_INCREMENT,
        Referer                 text                    NOT NULL,
        Url                     text                    NOT NULL,
        QueryString             text                    NOT NULL,
        Host                    varchar(50)             NOT NULL,
        UserAgent               text                    NOT NULL,
        RemoteAddress           varchar(50)             NOT NULL,
        ScriptName              varchar(100)            NOT NULL,
        TimeStamp               timestamp               NOT NULL,
        Method                  varchar(10)             NOT NULL,
/*      HTTPStatus              int,
        Time                    int,*/

        INDEX (Id),
        INDEX (Host),
        INDEX (RemoteAddress),
        INDEX (ScriptName),
        INDEX (Method),
        INDEX (TimeStamp)
);

CREATE TABLE LogEntry
(
        Id              int              NOT NULL PRIMARY KEY AUTO_INCREMENT,
        RequestId       int              ,
        LoggerName      varchar(128)     NOT NULL,
        TimeStamp       timestamp        NOT NULL,
        Message         varchar(512)     NOT NULL,
        Thread          varchar(50)      NOT NULL,
        Level           varchar(10)      NOT NULL,
        Host            varchar(256)     NOT NULL,

        INDEX (Id),
        INDEX (RequestId),
        INDEX (LoggerName),
        INDEX (Message),
        INDEX (Level),
        INDEX (TimeStamp),

        FOREIGN KEY (RequestId)         REFERENCES RequestInfo(Id) ON DELETE CASCADE
);

CREATE TABLE Exception
(
        Id              int                     NOT NULL PRIMARY KEY AUTO_INCREMENT,
        LogEntryId      int                     NOT NULL,
        Level           int                     NOT NULL,
        Type            varchar(100)            NOT NULL,
        Message         text                    NOT NULL,
        Source          varchar(50)             NOT NULL,
        TargetSite      varchar(100)            NOT NULL,
        StackTrace      text                    NOT NULL,
        TimeStamp       timestamp               NOT NULL,

        INDEX (Id),
        INDEX (LogEntryId),
        INDEX (Type),
        INDEX (Source),
        INDEX (TimeStamp),

        FOREIGN KEY (LogEntryId)        REFERENCES LogEntry(Id)
);

create index timestamp_level on LogEntry (timestamp, level)