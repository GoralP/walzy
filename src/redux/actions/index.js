import { loginWithGoogle } from "./AuthActions";
import { googleSignup } from "./AuthActions";
import { loginWithFacebook } from "./AuthActions";
import { facebookSignup } from "./AuthActions";
import { getProfile, updateProfile, getAllUserProfile } from "./ProfileAction";
import { getAllWallpaper, getAllRingtone } from "./AllWallpaperRingtoneAction";
import { downloadNow } from "./DownloadAction";
import { favoriteWallpaper, addFavoriteWallpaper } from "./FavoriteAction";
import { uploadFile, uploadRingtone } from "./UploadFileAction";
import { searchWallpaper } from "./SearchWallpaper";
import { feedback } from "./FeedbackAction";
import { downloadRingtone } from "./DownloadRingtone";
import { getTagWallpaper } from "./TagSearch";

export {
  loginWithGoogle,
  googleSignup,
  loginWithFacebook,
  facebookSignup,
  getProfile,
  updateProfile,
  getAllWallpaper,
  getAllRingtone,
  downloadNow,
  favoriteWallpaper,
  addFavoriteWallpaper,
  uploadFile,
  searchWallpaper,
  feedback,
  uploadRingtone,
  downloadRingtone,
  getTagWallpaper,
  getAllUserProfile,
};
