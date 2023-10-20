const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const app = express();
const connectMongoDB = require("./db");
const user = require("./user");
const sendEmail = require("./email");

dotenv.config();
connectMongoDB();

const port = process.env.PORT || 5000;
app.use(express.json());


app.use(express.urlencoded({ extended: false }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.get("/listOfUsers", async (req, res) => {
  const users = await user.find();
  res.send({ Users: users });
});

app.get("/registeredUsers", async (req, res) => {
  const count = await user.find().count();
  res.send({ "No Of Users": count });
});

app.get("/referralCodeRanking",async(req,res)=>{
  user.aggregate([
    {
      $addFields: {
        lowerCaseCity: { $toLower: "$referralCode" }
      }
    },
    {
      $group: {
        _id: "$lowerCaseCity",
        count: { $sum: 1 }
      }
    },
  ])
  .exec()
  .then(groupedElements => {
    // Print or process the groupedElements as needed
    console.log(groupedElements);
    res.send(groupedElements)
  })
  .catch(err => {
    console.error(err);
  });
})


app.post("/createUser", async (req, res) => {
  try {
    const existing = await user.findOne({ email: req.body.email });

    if (existing != null) {
      console.log("invalid email");
      return res.status(403).send({
        success: "false",
        message: "Email Already Registered",
      });
    }
    // const existing2 = await user.findOne({
    //   transactionId: req.body.transactionId,
    // });

    // if (existing2 != null) {
    //   return res.status(402).send({
    //     success: "false",
    //     message: "Transaction id already used",
    //   });
    // }

    if (req.body.phone.toString().length !== 10) {
      return res.status(401).send({
        success: "false",
        message: "Invalid mobile number",
      });
    }

    let User = new user({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      // transactionId: req.body.transactionId,
      reason: req.body.reason,
      yearOfStudy: req.body.yearOfStudy,
      isDualBooted: req.body.isDualBooted,
      branch: req.body.branch,
    });
    const postdata = await User.save();
    try {
      sendEmail(User.email, "Your Registration was successfull!!", `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
            rel="stylesheet"
          />
          <title>LinuxDiary 4.0</title>
        </head>
      
        <body style="font-family: 'Poppins', sans-serif">
          <div>
            <u></u>
      
            <div
              style="
                text-align: center;
                margin: 0;
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 0;
                padding-right: 0;
                background-color: #f2f4f6;
                color: #000000;
              "
              align="center"
            >
              <div style="text-align: center">
                <table
                  align="center"
                  style="
                    text-align: center;
                    vertical-align: middle;
                    width: 600px;
                    max-width: 600px;
                  "
                  width="600"
                >
                  <tbody>
                    <tr>
                      <td
                        style="width: 596px; vertical-align: middle"
                        width="596"
                      ></td>
                    </tr>
                  </tbody>
                </table>
      
                <img
                  style="
                    width: 600px;
                    max-width: 600px;
                    height: 350px;
                    max-height: 350px;
                    text-align: center;
                  "
                  alt="LinuxDiary 4.0 image"
                  src="https://res.cloudinary.com/dbqq0kjga/image/upload/v1691067553/LINUX-Diary_j7sq1s.png"
                  align="center"
                  width="600"
                  height="350"
                  class="CToWUd a6T"
                  data-bit="iit"
                  tabindex="0"
                />
                <div
                  class="a6S"
                  dir="ltr"
                  style="opacity: 0.01; left: 552px; top: 501.5px"
                >
                  <div
                    id=":155"
                    class="T-I J-J5-Ji aQv T-I-ax7 L3 a5q"
                    role="button"
                    tabindex="0"
                    aria-label="Download attachment "
                    jslog="91252; u014N:cOuCgd,Kr2w4b,xr6bB; 4:WyIjbXNnLWY6MTc2MjU0MTQxMTA0MjYyMTM2NyIsbnVsbCxbXV0."
                    data-tooltip-class="a1V"
                    data-tooltip="Download"
                  >
                    <div class="akn">
                      <div class="aSK J-J5-Ji aYr"></div>
                    </div>
                  </div>
                </div>
      
                <table
                  align="center"
                  style="
                    text-align: center;
                    vertical-align: top;
                    width: 600px;
                    max-width: 600px;
                    background-color: #ffffff;
                  "
                  width="600"
                >
                  <tbody style="color: #343434">
                    <tr>
                      <td
                        style="
                          width: 596px;
                          vertical-align: top;
                          padding-left: 30px;
                          padding-right: 30px;
                          padding-top: 30px;
                          padding-bottom: 40px;
                        "
                        width="596"
                      >
                        <h1
                          style="
                            font-size: 22px;
                            line-height: 34px;
                            font-family: 'Helvetica', Arial, sans-serif;
                            font-weight: 600;
                            text-decoration: none;
                            color: #000000;
                          "
                        >
                          Hola Open Sourcerer!🐧
                        </h1>
      
                        <p
                          style="
                            line-height: 24px;
                            font-weight: 400;
                            text-decoration: none;
                          "
                        >
                          We are pleased to inform you that your registration for
                          <strong>LinuxDairy 4.0</strong> was successful!🎉<br /><br />
                          The event will be held on
                          <strong><em>19th and 20th of August 2023</em></strong
                          >, focusing on Linux along with exciting WarGames at the
                          end.⚔️💻
                        </p>
                        You will have access to all the sessions and activities we
                        have scheduled for the event as a registered participant.
                        <br />
                        <br />
                        Please do not hesitate to contact us if you have any queries
                        about the event. We will be happy to assist you in any way we
                        can.
                        <p></p>
                        <p>
                          <strong style="font-size: 17px">
                            LinuxDiary 4.0 Website:</strong
                          >
                          <a
                            href="https://linuxdiary2023.wcewlug.org"
                            style="font-size: 17px"
                            >linuxdiary2023.wcewlug.org</a
                          >
                          <br />
                          Do share this with your friends and join us for an exciting
                          journey!
                        </p>
      
                        <p>
                          <strong>
                            <i>We look forward to seeing you there!</i>
                          </strong>
                        </p>
      
                        <p>
                          Thanks and regards,<br />
                          Walchand Linux Users' Group
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
      
                <table
                  align="center"
                  style="
                    text-align: center;
                    vertical-align: top;
                    width: 600px;
                    max-width: 600px;
                    background-color: #ffffff;
                  "
                  width="600"
                >
                  <tbody>
                    <tr>
                      <td
                        style="
                          width: 596px;
                          vertical-align: top;
                          padding-left: 0;
                          padding-right: 0;
                        "
                      >
                        <img
                          style="
                            text-align: center;
                            border-top-left-radius: 30px;
                            border-bottom-right-radius: 30px;
                            margin-bottom: 5px;
                          "
                          alt="Logo"
                          src="https://res.cloudinary.com/dduur8qoo/image/upload/v1689771850/wlug_white_logo_page-0001_u8efnh.jpg"
                          align="center"
                          width="200"
                          height="120"
                          class="CToWUd"
                          data-bit="iit"
                        />
                      </td>
                    </tr>
      
                    <tr style="margin-bottom: 30px" align="center">
                      <td align="center">
                        <a
                          href="https://www.instagram.com/wcewlug/"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/wcewlug/&amp;source=gmail&amp;ust=1680976985984000&amp;usg=AOvVaw16ObtJOZ1hpw9644RZ4oMM"
                          style="margin: 0 12px"
                          ><img
                            src="https://res.cloudinary.com/dduur8qoo/image/upload/v1689773467/Instagram_vn7dni_kzulby.png"
                            class="CToWUd"
                            data-bit="iit"
                            height="30"
                            width="30"
                        /></a>
                        <a
                          href="https://twitter.com/wcewlug"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://twitter.com/wcewlug&amp;source=gmail&amp;ust=1680976985984000&amp;usg=AOvVaw1ypHRKREADjq_cn0IRD2po"
                          ><img
                            src="https://res.cloudinary.com/dduur8qoo/image/upload/v1689772239/twitter-icon-square-logo-108D17D373-seeklogo.com_tjkqmo.png"
                            class="CToWUd"
                            data-bit="iit"
                            height="30"
                            width="30"
                            style="border-radius: 5px"
                        /></a>
                        <a
                          href="https://linkedin.com/company/wlug-club"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=https://linkedin.com/company/wlug-club&amp;source=gmail&amp;ust=1680976985984000&amp;usg=AOvVaw0TDo2Akq1O-un9s_gRi70t"
                          style="margin: 0 10px"
                          ><img
                            src="https://res.cloudinary.com/dduur8qoo/image/upload/v1685247353/linkedin_mg2ujv.png"
                            class="CToWUd"
                            data-bit="iit"
                            height="30"
                            width="30"
                            style="border-radius: 5px"
                        /></a>
                        <a
                          href="http://discord.wcewlug.org/join"
                          target="_blank"
                          data-saferedirecturl="https://www.google.com/url?q=http://discord.wcewlug.org/join&amp;source=gmail&amp;ust=1680976985984000&amp;usg=AOvVaw3PNiAyDSeiO1V36KVKeLZl"
                          style="margin: 0 1px"
                          ><img
                            src="https://res.cloudinary.com/dduur8qoo/image/upload/v1689771996/unnamed_m7lgs0.png"
                            class="CToWUd"
                            data-bit="iit"
                            height="30"
                            width="30"
                            style="border-radius: 5px"
                        /></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="yj6qo"></div>
                <div class="adL"></div>
              </div>
              <div class="adL"></div>
            </div>
            <div class="adL"></div>
          </div>
        </body>
      </html>
      `);
    } catch (error) {
      console.log(error);
    }
    console.log(postdata);
    return res
      .status(201)
      .json({
        success: true,
        message: "User Registered Successfully",
        postdata,
      });
  } catch (error) {
    res.status(500).send("Failed to submit!!! Try Again");
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Listening to port 5000");
});
