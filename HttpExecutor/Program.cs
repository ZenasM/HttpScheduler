using HttpExecutor.Model;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Channels;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace HttpExecutor
{
    class Program
    {
        public static void Main(string[] args)
        {
            for (var i = 0; i < 100; i++) { SeedData(); }
            TplTest();
            Console.ReadLine();
        }

        public static void SeedData()
        {
            _ = HttpRecordService.PostHttpRecord(new HttpRecord()
            {
                Method = Model.HttpMethod.HEAD,
                Uri = @"https://localhost:44337/Home",
                Time = DateTime.UtcNow.AddSeconds(10)
            });
        }

        public static async void TplTest()
        {
            var service = new TplPollingService();
            service.StartPoll();

            var buffer = service.GetReader();
            while (await buffer.OutputAvailableAsync())
            {
                while (buffer.TryReceive(out HttpRecord item))
                {
                    await SendRequest(item);
                }
            }
        }

        public static async void ChannelTest()
        {
            var service = new ChannelPollingService();
            service.StartPoll();
            var reader = service.GetReader();

            while (true)
            {
                var item = await reader.ReadAsync();
                await SendRequest(item);
            }
        }

        private static async Task SendRequest(HttpRecord record)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", record.Token);

                var requestMessage = new HttpRequestMessage(Convert(record.Method), record.Uri);
                requestMessage.Content = JsonContent.Create(record.Body);

                var response = await client.SendAsync(requestMessage);
                Console.WriteLine(response.ToString());

                record.Completed = true;
                _ = HttpRecordService.PutHttpRecord(record.HttpRecordId, record);
            }
        }

        public static System.Net.Http.HttpMethod Convert(Model.HttpMethod method)
        {
            switch (method)
            {
                case Model.HttpMethod.DELETE: return System.Net.Http.HttpMethod.Delete;
                case Model.HttpMethod.GET: return System.Net.Http.HttpMethod.Get;
                case Model.HttpMethod.HEAD: return System.Net.Http.HttpMethod.Head;
                case Model.HttpMethod.OPTION: return System.Net.Http.HttpMethod.Options;
                case Model.HttpMethod.PATCH: return System.Net.Http.HttpMethod.Patch;
                case Model.HttpMethod.POST: return System.Net.Http.HttpMethod.Post;
                case Model.HttpMethod.PUT: return System.Net.Http.HttpMethod.Put;
                case Model.HttpMethod.TRACE: return System.Net.Http.HttpMethod.Trace;
            }
            return null;
        }
    }
}
