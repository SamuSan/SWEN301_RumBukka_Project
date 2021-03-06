using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccess.Model;
using Server.Interfaces;
using Newtonsoft.Json;

namespace Server.Handlers
{
    public class UsersHandler : HttpHandler

    {
        BookingContext db = new BookingContext();

        public object getSingle(int id)
        {
            return db.Users.Where(i=>i.User_Id == id).FirstOrDefault();
        }

        public object getList()
        {
            return db.Users.ToList();
        }

	public object postNew(string json)
        {
	  User user = JsonConvert.DeserializeObject<User>(json);
	  if (db.Users.Where(i=>i.VUWId == user.VUWId).Count() > 0) {     
	      user.VUWId = -1;
	      return user; //fail
	  }
	
	  user.Organisation = db.Organisations.Where(i=>i.Organisation_Id == user.Organisation.Organisation_Id).FirstOrDefault();
	
	  db.Users.Add(user);
	  
	  db.SaveChanges();
	  
	  return user;
        }
        
        public object deleteSingle(int id)
        {
        db.Users.Remove((User)getSingle(id));
        db.SaveChanges();
        return "delete";
        } 
        
        public object update(string json)
        {
            User user = JsonConvert.DeserializeObject<User>(json);

            User prox = (User)getSingle(user.User_Id);

            prox.FirstName = user.FirstName;
            prox.LastName = user.LastName;
            prox.VUWId = user.VUWId;
            prox.Type = user.Type;
            prox.Organisation = db.Organisations.Where(i=>i.Organisation_Id == user.Organisation.Organisation_Id).FirstOrDefault();
            prox.Phone = db.Phones.Where(i=>i.Phone_Id == user.Phone.Phone_Id).FirstOrDefault();
            prox.Email = user.Email;
            prox.Mobile = user.Mobile;

            db.SaveChanges();

            return "update";

        }
        public object getFilter(int id)
        {
        return null;
        }
    }
}
