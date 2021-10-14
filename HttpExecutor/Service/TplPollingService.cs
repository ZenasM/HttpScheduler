using HttpExecutor.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace HttpExecutor
{
    public class TplPollingService
    {
        private CancellationTokenSource cancelToken;

        private BufferBlock<HttpRecord> buffer;
        private int pollRate = 5000;

        public TplPollingService()
        {
            this.buffer = new BufferBlock<HttpRecord>();
        }

        public BufferBlock<HttpRecord> GetReader() => this.buffer;

        public void StartPoll()
        {
            if (cancelToken == null)
            {
                this.cancelToken = new CancellationTokenSource();
                var listener = Task.Factory.StartNew(async () =>
                {
                    while (true)
                    {
                        _ = this.PollAsync();
                        await Task.Delay(this.pollRate, this.cancelToken.Token);
                        if (this.cancelToken.IsCancellationRequested) { break; }
                    }
                }, this.cancelToken.Token, TaskCreationOptions.LongRunning, TaskScheduler.Default);
            }
        }

        public void StopPoll()
        {
            using (this.cancelToken){ this.cancelToken.Cancel(); }
            this.cancelToken = null;
            this.buffer = null;
        }

        protected async Task PollAsync()
        {
            Console.WriteLine("Polling for more items.");
            var list = await HttpRecordService.GetActionableHttpRecords();
            Console.WriteLine($"Polling {list.Count()} items.");
            foreach (var i in list) { _ = this.buffer.SendAsync(i); }
        }
    }
}
