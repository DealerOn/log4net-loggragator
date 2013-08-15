log4net-loggragator
===================

A log4net mysql appender and corresponding web interface


The Dealeron loggragator is a log4net custom appender that writes log messages and other info to a mysql database.

# Usage:
## Config snippet to create custom appender:

<appender name="DBAppender" type="DealerOn.Logging.DBAppender, DealerOn.Logging">
    <connectionString value="server=servername;user id=username;password=<<redacted>>;persist security info=True;database=collector"/>
</appender>

## You must reference the appender later on in the config

<root>
    <level value="DEBUG" />
    <appender-ref ref="RollingLogFileAppender" />
    <appender-ref ref="DBAppender" />
</root>

The mysql connector for .net must be installed as well (v6.6.5 was used at the creation of this document)

http://cdn.mysql.com/Downloads/MySQLInstaller/mysql-installer-web-community-5.6.12.0.msi (you only need select the connector for .net from the installer) 