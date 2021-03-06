using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Server.Interfaces
{
    public interface HttpHandler
    {

     
        Object getSingle(int id);

        Object getList();
        
        Object postNew(string json);
        
        Object deleteSingle(int id);
        
        Object update(string json);
        
        Object getFilter(int id);


    }
}
