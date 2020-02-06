import './pages/index.css';

import Api from './modules/api';
import Card from './modules/card';
import CardList from './modules/cardList';
import { errors } from './modules/errors';
import Owner from './modules/owner';
import PopupAvatar from './modules/popupAvatar';
import PopupEdit from './modules/popupEdit';
import PopupImage from './modules/popupImage';
import PopupPlace from './modules/popupPlace';
import Root from './modules/root';
import Spinner from './modules/spinner';
import UserInfo from './modules/userInfo';
import Validation from './modules/validation';

const api = new Api({
  url: NODE_ENV === 'development'?'http://praktikum.tk/cohort6':'https://praktikum.tk/cohort6',
  headers: {
      authorization: 'eaddcdab-86db-46f3-88bc-3b9671c80f29',
      'Content-Type': 'application/json'
  }
});

const owner = new Owner();
const card = new Card(api, owner);

const userInfoDom = document.querySelector('.user-info');
const userInfo = new UserInfo(userInfoDom, api, owner);
const validation = new Validation(errors);
const spinner = new Spinner(document.querySelector('.spinner'));
const cardList = new CardList(document.querySelector('.places-list'), card, api, spinner);
const edit = new PopupEdit(document.querySelector('.popup_type_edit'), validation, userInfo, api);
const place = new PopupPlace(document.querySelector('.popup_type_place'), validation, cardList, api);
const image = new PopupImage(document.querySelector('.popup_type_image'));
const root = new Root(document.querySelector('.root'));

const avatar = new PopupAvatar(document.querySelector('.popup_type_avatar'), validation, userInfo, api);

userInfo.getUserInfo('/users/me');
userInfoDom.addEventListener('click', event => {
  avatar.open(event);
  edit.open(event);
  place.open(event);
});

avatar.form.addEventListener('input', event => {
  avatar.validation.validate(event);
});
avatar.form.addEventListener('submit', event => {
  avatar.submit('/users/me/avatar', event);
});

cardList.render('/cards');
cardList.container.addEventListener('click', event => {
  card.like(event);
  card.remove(event);
});

edit.form.addEventListener('input', event => {
  edit.validation.validate(event);
});
edit.form.addEventListener('submit', event => {
  edit.submit('/users/me', event);
});


place.form.addEventListener('input', event => {
  place.validation.validate(event);
});
place.form.addEventListener('submit', event => {
  place.submit('/cards', event);
});

root.container.addEventListener('click', event => {
  avatar.close(event);
  image.open(event);
  image.close(event);
  place.close(event);
  edit.close(event);
});