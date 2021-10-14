using HttpExecutor.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace HttpExecutor
{
    // Lazy singleton.
    public static class HttpRecordService
    {
        private static HttpClient client;
        private static string headPath = "api/home";
        private static string recordPath = "api/httprecords";

        static HttpRecordService()
        {
            client = new HttpClient();
            client.BaseAddress = new Uri("https://localhost:44337/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        public async static Task<IEnumerable<HttpRecord>> GetActionableHttpRecords()
        {
            using (var response = await client.GetAsync($"{recordPath}/action"))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiResponse = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<IEnumerable<HttpRecord>>(apiResponse);
                }
                else
                {
                    return null;
                }
            }
        }

        public async static Task<IEnumerable<HttpRecord>> GetHttpRecords()
        {
            using (var response = await client.GetAsync($"{recordPath}"))
            {
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var apiResponse = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<IEnumerable<HttpRecord>>(apiResponse);
                }
                else
                {
                    return null;
                }
            }
        }

        public async static Task<HttpRecord> GetHttpRecord(int id)
        {
            using (var response = await client.GetAsync($"{recordPath}/{id}"))
            {
                if (response.IsSuccessStatusCode)
                {
                    var apiResponse = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<HttpRecord>(apiResponse);
                }
                else
                {
                    return null;
                }
            }
        }

        public async static Task PutHttpRecord(int id, HttpRecord httpRecord)
        {
            var response = await client.PutAsJsonAsync($"{recordPath}/{id}", httpRecord);
            response.EnsureSuccessStatusCode();
        }

        public async static Task<HttpRecord> PostHttpRecord(HttpRecord httpRecord)
        {
            using (var response = await client.PostAsJsonAsync($"{recordPath}", httpRecord))
            {
                if (response.IsSuccessStatusCode)
                {
                    var apiResponse = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<HttpRecord>(apiResponse);
                }
                else
                {
                    return null;
                }
            }
        }

        public async static Task DeleteHttpRecord(int id)
        {
            var response = await client.DeleteAsync($"{recordPath}/{id}");
            response.EnsureSuccessStatusCode();
        }
    }
}
