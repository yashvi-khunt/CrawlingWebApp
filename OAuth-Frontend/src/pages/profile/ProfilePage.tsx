import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useUserDetailsQuery } from "../../redux/api/userApi";

function ProfilePage() {
  const [userEmail, setUserEmail] = useState<null | string>(null);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const { data: userDetails } = useUserDetailsQuery(userEmail ? userEmail : "");

  useEffect(() => {
    const email = searchParams.get("email");
    if (email !== null || email !== "") {
      setUserEmail(email);
    }
  }, []);
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Profile</h1>
            </div>
            <div className="col-sm-6">
              {" "}
              <button
                onClick={() => {
                  navigate("/profile/edit");
                }}
                className="btn btn-primary float-sm-right"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              {/* Profile Image */}
              <div className="card card-primary card-outline">
                <div className="card-body box-profile">
                  <div className="text-center">
                    <img
                      className="profile-user-img img-fluid img-circle"
                      src="../../dist/img/user4-128x128.jpg"
                      alt="User profile picture"
                    />
                  </div>
                  <h3 className="profile-username text-center">
                    {`${userDetails?.firstName || ""} ${
                      userDetails?.lastName || ""
                    }`}
                  </h3>
                  <p className="text-muted text-center">Software Engineer</p>
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}

              {/* /.card */}
            </div>
            {/* /.col */}
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#activity"
                        data-toggle="tab"
                      >
                        Activity
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#timeline"
                        data-toggle="tab"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <div className="tab-content">
                    <div className="active tab-pane" id="activity">
                      {/* Post */}
                      <div className="post">
                        <div className="user-block">
                          <img
                            className="img-circle img-bordered-sm"
                            src="../../dist/img/user1-128x128.jpg"
                            alt="user image"
                          />
                          <span className="username">
                            <a href="#">Jonathan Burke Jr.</a>
                            <a href="#" className="float-right btn-tool">
                              <i className="fas fa-times" />
                            </a>
                          </span>
                          <span className="description">
                            Shared publicly - 7:30 PM today
                          </span>
                        </div>
                        {/* /.user-block */}
                        <p>
                          Lorem ipsum represents a long-held tradition for
                          designers, typographers and the like. Some people hate
                          it and argue for its demise, but others ignore the
                          hate as they create awesome tools to help create
                          filler text for everyone from bacon lovers to Charlie
                          Sheen fans.
                        </p>
                        <p>
                          <a href="#" className="link-black text-sm mr-2">
                            <i className="fas fa-share mr-1" /> Share
                          </a>
                          <a href="#" className="link-black text-sm">
                            <i className="far fa-thumbs-up mr-1" /> Like
                          </a>
                          <span className="float-right">
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-comments mr-1" /> Comments
                              (5)
                            </a>
                          </span>
                        </p>
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Type a comment"
                        />
                      </div>
                      {/* /.post */}
                      {/* Post */}
                      <div className="post clearfix">
                        <div className="user-block">
                          <img
                            className="img-circle img-bordered-sm"
                            src="../../dist/img/user7-128x128.jpg"
                            alt="User Image"
                          />
                          <span className="username">
                            <a href="#">Sarah Ross</a>
                            <a href="#" className="float-right btn-tool">
                              <i className="fas fa-times" />
                            </a>
                          </span>
                          <span className="description">
                            Sent you a message - 3 days ago
                          </span>
                        </div>
                        {/* /.user-block */}
                        <p>
                          Lorem ipsum represents a long-held tradition for
                          designers, typographers and the like. Some people hate
                          it and argue for its demise, but others ignore the
                          hate as they create awesome tools to help create
                          filler text for everyone from bacon lovers to Charlie
                          Sheen fans.
                        </p>
                        <form className="form-horizontal">
                          <div className="input-group input-group-sm mb-0">
                            <input
                              className="form-control form-control-sm"
                              placeholder="Response"
                            />
                            <div className="input-group-append">
                              <button type="submit" className="btn btn-danger">
                                Send
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      {/* /.post */}
                      {/* Post */}
                      <div className="post">
                        <div className="user-block">
                          <img
                            className="img-circle img-bordered-sm"
                            src="../../dist/img/user6-128x128.jpg"
                            alt="User Image"
                          />
                          <span className="username">
                            <a href="#">Adam Jones</a>
                            <a href="#" className="float-right btn-tool">
                              <i className="fas fa-times" />
                            </a>
                          </span>
                          <span className="description">
                            Posted 5 photos - 5 days ago
                          </span>
                        </div>
                        {/* /.user-block */}
                        <div className="row mb-3">
                          <div className="col-sm-6">
                            <img
                              className="img-fluid"
                              src="../../dist/img/photo1.png"
                              alt="Photo"
                            />
                          </div>
                          {/* /.col */}
                          <div className="col-sm-6">
                            <div className="row">
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="../../dist/img/photo2.png"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="../../dist/img/photo3.jpg"
                                  alt="Photo"
                                />
                              </div>
                              {/* /.col */}
                              <div className="col-sm-6">
                                <img
                                  className="img-fluid mb-3"
                                  src="../../dist/img/photo4.jpg"
                                  alt="Photo"
                                />
                                <img
                                  className="img-fluid"
                                  src="../../dist/img/photo1.png"
                                  alt="Photo"
                                />
                              </div>
                              {/* /.col */}
                            </div>
                            {/* /.row */}
                          </div>
                          {/* /.col */}
                        </div>
                        {/* /.row */}
                        <p>
                          <a href="#" className="link-black text-sm mr-2">
                            <i className="fas fa-share mr-1" /> Share
                          </a>
                          <a href="#" className="link-black text-sm">
                            <i className="far fa-thumbs-up mr-1" /> Like
                          </a>
                          <span className="float-right">
                            <a href="#" className="link-black text-sm">
                              <i className="far fa-comments mr-1" /> Comments
                              (5)
                            </a>
                          </span>
                        </p>
                        <input
                          className="form-control form-control-sm"
                          type="text"
                          placeholder="Type a comment"
                        />
                      </div>
                      {/* /.post */}
                    </div>
                    {/* /.tab-pane */}
                    <div className="tab-pane" id="timeline">
                      {/* The timeline */}
                      <div className="timeline timeline-inverse">
                        {/* timeline time label */}
                        <div className="time-label">
                          <span className="bg-danger">10 Feb. 2014</span>
                        </div>
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        <div>
                          <i className="fas fa-envelope bg-primary" />
                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock" /> 12:05
                            </span>
                            <h3 className="timeline-header">
                              <a href="#">Support Team</a> sent you an email
                            </h3>
                            <div className="timeline-body">
                              Etsy doostang zoodles disqus groupon greplin oooj
                              voxy zoodles, weebly ning heekya handango imeem
                              plugg dopplr jibjab, movity jajah plickers sifteo
                              edmodo ifttt zimbra. Babblely odeo kaboodle quora
                              plaxo ideeli hulu weebly balihoo...
                            </div>
                            <div className="timeline-footer">
                              <a href="#" className="btn btn-primary btn-sm">
                                Read more
                              </a>
                              <a href="#" className="btn btn-danger btn-sm">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* END timeline item */}
                        {/* timeline item */}
                        <div>
                          <i className="fas fa-user bg-info" />
                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock" /> 5 mins ago
                            </span>
                            <h3 className="timeline-header border-0">
                              <a href="#">Sarah Young</a> accepted your friend
                              request
                            </h3>
                          </div>
                        </div>
                        {/* END timeline item */}
                        {/* timeline item */}
                        <div>
                          <i className="fas fa-comments bg-warning" />
                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock" /> 27 mins ago
                            </span>
                            <h3 className="timeline-header">
                              <a href="#">Jay White</a> commented on your post
                            </h3>
                            <div className="timeline-body">
                              Take me to your leader! Switzerland is small and
                              neutral! We are more like Germany, ambitious and
                              misunderstood!
                            </div>
                            <div className="timeline-footer">
                              <a
                                href="#"
                                className="btn btn-warning btn-flat btn-sm"
                              >
                                View comment
                              </a>
                            </div>
                          </div>
                        </div>
                        {/* END timeline item */}
                        {/* timeline time label */}
                        <div className="time-label">
                          <span className="bg-success">3 Jan. 2014</span>
                        </div>
                        {/* /.timeline-label */}
                        {/* timeline item */}
                        <div>
                          <i className="fas fa-camera bg-purple" />
                          <div className="timeline-item">
                            <span className="time">
                              <i className="far fa-clock" /> 2 days ago
                            </span>
                            <h3 className="timeline-header">
                              <a href="#">Mina Lee</a> uploaded new photos
                            </h3>
                            <div className="timeline-body">
                              <img
                                src="https://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="https://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="https://placehold.it/150x100"
                                alt="..."
                              />
                              <img
                                src="https://placehold.it/150x100"
                                alt="..."
                              />
                            </div>
                          </div>
                        </div>
                        {/* END timeline item */}
                        <div>
                          <i className="far fa-clock bg-gray" />
                        </div>
                      </div>
                    </div>
                    {/* /.tab-pane */}

                    {/* /.tab-pane */}
                  </div>
                  {/* /.tab-content */}
                </div>
                {/* /.card-body */}
              </div>
              {/* /.card */}
            </div>
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </section>
    </div>
  );
}

export default ProfilePage;
