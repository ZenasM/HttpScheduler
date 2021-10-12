using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HttpScheduler.Model
{
    public class HttpRecord
    {
        public int HttpRecordId { get; set; }
        public DateTimeOffset Time { get; set; }
        public HttpMethod Method { get; set; }
        public string Uri { get; set; }
        public string Token { get; set; }
        public string Body { get; set; }
        public bool Completed { get; set; }
    }

    public enum HttpMethod
    {
        GET,
        HEAD,
        POST,
        PUT,
        DELETE,
        CONNECT,
        OPTION,
        TRACE,
        PATCH,
    }
}
