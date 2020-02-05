import './pages/index.css';
import {Card} from './scripts/card.js';
import {CardList} from './scripts/cardList.js';
import {errors} from './scripts/errors.js';
import {Owner} from './scripts/owner.js';
import {PopupAvatar} from './scripts/popupAvatar.js';
import {PopupEdit} from './scripts/popupEdit.js';
import {PopupImage} from './scripts/popupImage.js';
import {PopupPlace} from './scripts/popupPlace.js';
import {Root} from './scripts/root.js';
import {Spinner} from './scripts/spinner.js';
import {UserInfo} from './scripts/userInfo.js';
import {Validation} from './scripts/validation.js';
import {Api, api} from './server.js';

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