using HttpExecutor.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace HttpExecutor
{
    // Duplicates are possible here.
    public class ChannelPollingService
    {
        private readonly Channel<HttpRecord> _channel;
        private CancellationTokenSource cancelToken;
        private int pollRate = 5000;


        public ChannelPollingService()
        {
            this._channel = Channel.CreateUnbounded<HttpRecord>();
            this.StartPoll();
        }

        public ChannelReader<HttpRecord> GetReader() => this._channel.Reader;

        public void StartPoll()
        {
            if (cancelToken == null) 
            {
                this.cancelToken = new CancellationTokenSource();
                var listener = Task.Factory.StartNew(() =>
                {
                    while (true)
                    {
                        _ = this.PollAsync();
                        Thread.Sleep(this.pollRate);
                        if (this.cancelToken.IsCancellationRequested) { break; }
                    }
                }, this.cancelToken.Token, TaskCreationOptions.LongRunning, TaskScheduler.Default);
            }
        }

        public void StopPoll()
        {
            using (this.cancelToken) { this.cancelToken.Cancel(); }
            this.cancelToken = null;
        }

        private async Task PollAsync()
        {
            Console.WriteLine("Polling for more items.");
            var list = await HttpRecordService.GetActionableHttpRecords();
            Console.WriteLine($"Polling {list.Count()} items.");

            var writer = this._channel.Writer;
            foreach (var i in list) { writer.TryWrite(i); }
        }
    }
}
