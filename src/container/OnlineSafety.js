import React, { useEffect } from "react";
import { Main } from "../view";

const OnlineSafety = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <section>
        <Main />
      </section>
      <div className="mt-64">
        <div className="container">
          <div className="terms-box">
            <div className="mb-3">
              <h5>Online safety and best practices</h5>
            </div>
            <p>
              By engaging in an online community, like Walzy, you are
              potentially exposing yourself to safety risks. Here are some basic
              tips that we recommend you practice while interacting with people
              on Walzy.
              <ul>
                <li>
                  Don't share personal information with people you meet on
                  Walzy. Personal information means "information that can be
                  used to uniquely identify, contact, or locate a single person
                  or can be used with other sources to uniquely identify a
                  single individual". Here are some examples of personal
                  information:
                  <ul type="square">
                    <li>Full name</li>
                    <li>Phone number</li>
                    <li>Bank details</li>
                    <li>Home address</li>
                    <li>Facebook ID or other similar IDs</li>
                    <li>
                      Websites containing information described above or
                      information about your relatives, friends etc.
                    </li>
                  </ul>
                </li>
                <br></br>
                <li>
                  Think twice before you share your email or instant messaging
                  address with people on Walzy. The person you shared it with
                  may not be the one he/she claimed to be and his/her intentions
                  may not be fully disclosed.
                </li>
                <br></br>
                <li>
                  Don't send personal pictures to people you meet on Walzy.
                </li>
                <br></br>
                <li>
                  Be careful when opening files sent from people on Walzy. They
                  can be harmful to your computer or it may not be the content
                  that you think it is.
                </li>
                <br></br>
                <li>
                  We discourage having real-life meetings with people you met on
                  Walzy. If you feel safe and still want to do it, you should
                  follow these guidelines:
                  <ul type="square">
                    <li>
                      Always consult your parents or a trusted adult before you
                      decide to meet someone. If possible, bring an adult to the
                      encounter.
                    </li>
                    <li>
                      Let people know where you're going and when you'll be back
                      from the encounter.
                    </li>
                    <li>
                      Always arrange the meeting in a very public place like a
                      popular coffee shop, a busy shopping mall, or similar
                      place.
                    </li>
                  </ul>
                </li>
                <br></br>
                <li>
                  If you decide to tell someone your age and/or gender, be
                  honest about it. Being dishonest about your age/gender can
                  lead to awkward, and potentially dangerous situations.
                </li>
                <br></br>
                <li>
                  Take threats, cyberbullying and other illegal activity
                  seriously! If you feel that someone is threatening, bullying
                  or performing other illegal activities to you, or someone else
                  on Walzy - be quick to report this behavior to Walzy. If you
                  know or suspect that a criminal act has taken place or may
                  happen, report the case to your local police.
                </li>
              </ul>
            </p>
            <p>
              We recommend that you take a look at these resources for more
              information:
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineSafety;
