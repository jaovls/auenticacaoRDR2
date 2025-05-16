class HomeController 
{
  constructor(app) 
  {
    app.get("/", (req, res) => 
    {
      res.render("Home/index.ejs")
    })
  }
}

module.exports = HomeController;
