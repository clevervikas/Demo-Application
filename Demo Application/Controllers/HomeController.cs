using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demo_Application.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
    }
}

namespace propertyinjuction
{
    public interface text
    {
        void print();

    }
    class format : text
    {
        public void print()
        {

            Console.WriteLine(" here is text format");

        }

    }
    // constructor injection  
    public class constructorinjection
    {

        private text _text;
        public constructorinjection(text t1)
        {
            this._text = t1;

        }
        public void print()
        {

            _text.print();
        }
    }
    class constructor
    {

        static void Main(string[] args)
        {

            constructorinjection cs = new constructorinjection(new format());
            cs.print();
            Console.ReadKey();

        }
    }
}
