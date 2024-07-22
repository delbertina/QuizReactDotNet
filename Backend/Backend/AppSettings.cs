using Microsoft.Extensions.Configuration;
namespace Backend
{
    public class AppSettings
    {
        private static AppSettings _instance;
        private static readonly object ObjLocked = new object();
        private IConfiguration _configuration;

        protected AppSettings()
        {
        }
        public void SetConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string GetConnection(string key, string defaultValue = "")
        {
            try
            {
                return _configuration.GetConnectionString(key);
            }
            catch
            {
                return defaultValue;
            }
        }
        public static AppSettings Instance
        {
            get
            {
                if (null == _instance)
                {
                    lock (ObjLocked)
                    {
                        if (null == _instance)
                            _instance = new AppSettings();
                    }
                }
                return _instance;
            }
        }
    }
}