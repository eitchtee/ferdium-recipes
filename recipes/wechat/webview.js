function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const _path = _interopRequireDefault(require('path'));

module.exports = Ferdium => {
  const getMessages = () => {
    let directCount = 0;
    let indirectCount = 0;
    const chatItem = document.querySelectorAll('div.chat_item');

    Array.prototype.forEach.call(chatItem, item => {
      let count = 0;
      const reddot = item.querySelector('i.web_wechat_reddot_middle');
      const avatarImage = item.querySelector('img.img');

      if (reddot) {
        count = Ferdium.safeParseInt(reddot.textContent);
      }

      if (
        avatarImage &&
        avatarImage.getAttribute('src').search('webwxgeticon') !== -1
      ) {
        directCount += count;
      } else {
        indirectCount += count;
      }
    });

    Ferdium.setBadge(directCount, indirectCount);
  };

  Ferdium.loop(getMessages);

  Ferdium.injectCSS(_path.default.join(__dirname, 'service.css'));
};
