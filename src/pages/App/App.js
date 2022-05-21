import './App.css';
import AuthPage from "../AuthPage/AuthPage"
import { Route, Routes } from 'react-router-dom'
import UserProfilePage from "../UserProfilePage/UserProfilePage"
import { useState, useEffect } from 'react';
import HomePage from "../Homepage/Homepage"
import UserUploadArtPage from '../UserUploadArtPage/UserUploadArtPage';
import { getUser } from '../../utilities/users-service';
import UserWIPPage from '../UserProfilePage/UserWIPPage';
import UserFollowingListPage from "../UserProfilePage/UserFollowingListPage"
import UserAboutMePage from "../UserProfilePage/UserAboutMePage"
import ProductPage from '../ProductPage/ProductPage';
import NavHeader from '../../components/NavHeader/NavHeader';
import EditUserProfilePage from '../EditUserProfilePage/EditUserProfilePage';
import UpdateArtPage from '../UpdateArtPage/UpdateArtPage';
function App() {
  const [user, setUser] = useState(getUser());
  const [chosenUser, setChosenUser] = useState({})
  const [chosenWork, setChosenWork] = useState({})
  const [toggle, setToggle] = useState(false)
  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getUser()
        setUser(currentUser)
        console.log(user)
      } catch (err) {
        console.log(err)
      }
    })()
  },[toggle])

  return (
    <div className="App">
      {user ?
        <Routes>
          <Route path="/" element={<HomePage user={user}/>}/>
          <Route path="/user/:id" element={<UserProfilePage user={user}/>}/>
          <Route path="/art/:id" element={<ProductPage chosenWork={chosenWork}/>}/>
          <Route path="/user/:id/about" element={<UserAboutMePage toggle={toggle} setToggle={setToggle} user={user}/>}/>
          <Route path="/user/:id/following" element={<UserFollowingListPage user={user}/>}/>
          <Route path="/user/wip/:id" element={<UserWIPPage user={user}/>}/>
          <Route path="/user/chosenart/edt/:id/:userId" element={<UpdateArtPage user={user}/>}/>
          <Route path="/user/:id/artwork" element={<UserProfilePage setChosenWork={setChosenWork} user={user}/>}/>
          <Route path="/user/:id/upload" element={<UserUploadArtPage user={user}/>}/>
          <Route path="/user/edit/:id" element={<EditUserProfilePage toggle={toggle} setToggle={setToggle} user={user}/>}/>
        </Routes>
        :
        <AuthPage setUser={setUser} />
      }
    </div>
  );
}
export default App;
