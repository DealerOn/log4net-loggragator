log4net-loggragator
===================

##Appender:
The Appender will log to a MySQL database using EF and Oracle's MySQL connector for .net.

It will also log http requests (if HttpContext.Current is available) and attach them to log entries

##Viewer:
A simple angularjs website that connects to a breezejs webservice.

It can be hosted through IIS by using DealerOn.LogViewer as the base directory.  

You will need to use http://www.isapirewrite.com/ or similar to have the website function properly.


## Usage:
### Config snippet to create custom appender:

    <appender name="DBAppender" type="DealerOn.Logging.DBAppender, DealerOn.Logging">
        <connectionString value="server=servername;user id=username;password=password;persist security info=True;database=collector"/>
    </appender>

### You must reference the appender later on in the config:

    <root>
        <level value="DEBUG" />
        <appender-ref ref="DBAppender" />
    </root>

### MySQL
The mysql connector for .net must be installed as well (v6.6.5 was used at the creation of this document)

http://cdn.mysql.com/Downloads/MySQLInstaller/mysql-installer-web-community-5.6.12.0.msi 

(you only need select the connector for .net from the installer) 
