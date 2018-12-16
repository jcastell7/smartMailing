using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SQLite;

namespace data
{
    public class Connection
    {
        public static SQLiteConnection connect = null;
        public static SQLiteConnection getInstance() {
            if (connect == null)
            {
                SQLiteConnection.CreateFile("SmartMailing.sqlite");
                var m_dbConnection = new SQLiteConnection("Data Source=SmartMailing.sqlite;Version=3;");
                m_dbConnection.Open();
                return m_dbConnection;
            }
            else {
                return connect;
            }
        }

    }
}
