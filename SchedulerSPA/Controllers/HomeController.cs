using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SchedulerSPA.Controllers
{
    public class HomeController : Controller
    {
        private readonly IOptionsSnapshot<AppSettings> _settings;

        public HomeController(IOptionsSnapshot<AppSettings> settings)
        {
            this._settings = settings;
        }

        public IActionResult Configuration()
        {
            return Json(_settings.Value);
        }
    }
}
