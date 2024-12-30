const COMMENTS_PER_LOAD = 5;


const bigPictureModalElement = document.querySelector('.big-picture');
const commentsElement = bigPictureModalElement.querySelector('.social__comments');
const commentsDisplayedCountElement = bigPictureModalElement.querySelector('.social__comment-shown-count');
const loadMoreCommentsButtonElement = bigPictureModalElement.querySelector('.social__comments-loader');
const commentsFragmentElement = document.createDocumentFragment();


let currentCommentsCount = 5;
let allComments;


const createCommentTemplate = ({ id, avatar, message, name }) => {
  const templateCommentElement = document.querySelector('#social__comment')
    .content
    .querySelector('.social__comment');
  const templateComment = templateCommentElement.cloneNode(true);

  templateComment.dataset.commentId = id;
  templateComment.querySelector('.social__picture').src = avatar;
  templateComment.querySelector('.social__text').textContent = message;
  templateComment.querySelector('.social__picture').alt = name;

  return templateComment;
};


const displayComments = (data) => {
  allComments = data;

  if (allComments.length <= COMMENTS_PER_LOAD) {
    commentsDisplayedCountElement.textContent = allComments.length;

    allComments
      .forEach((comment) => commentsFragmentElement.append(
        createCommentTemplate(comment)
      ));

    loadMoreCommentsButtonElement.classList.add('hidden');
  } else {
    loadMoreCommentsButtonElement.classList.remove('hidden');
    commentsDisplayedCountElement.textContent = currentCommentsCount;

    for (let i = 0; i < currentCommentsCount; i++) {

      if (i < allComments.length) {
        commentsFragmentElement.append(createCommentTemplate(allComments[i]));
      }

      if (allComments.length <= currentCommentsCount) {
        commentsDisplayedCountElement.textContent = allComments.length;
        loadMoreCommentsButtonElement.classList.add('hidden');
      }
    }
  }

  commentsElement.append(commentsFragmentElement);
};


const onLoaderButtonClick = () => {
  commentsElement.textContent = '';
  currentCommentsCount += COMMENTS_PER_LOAD;

  displayComments(allComments);
};


const clearComments = () => {
  commentsElement.textContent = '';
  currentCommentsCount = COMMENTS_PER_LOAD;
  commentsDisplayedCountElement.textContent = currentCommentsCount;
};


loadMoreCommentsButtonElement.addEventListener('click', onLoaderButtonClick);


export { displayComments, clearComments };
