const COMMENTS_PER_LOAD = 5;

const bigPictureModal = document.querySelector('.big-picture');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const commentsDisplayedCount = bigPictureModal.querySelector('.social__comment-shown-count');
const loadMoreCommentsButton = bigPictureModal.querySelector('.social__comments-loader');
const commentsFragment = document.createDocumentFragment();


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
    commentsDisplayedCount.textContent = allComments.length;

    allComments
      .forEach((comment) => commentsFragment.append(
        createCommentTemplate(comment)
      ));

    loadMoreCommentsButton.classList.add('hidden');
  } else {
    loadMoreCommentsButton.classList.remove('hidden');
    commentsDisplayedCount.textContent = currentCommentsCount;

    for (let i = 0; i < currentCommentsCount; i++) {

      if (i < allComments.length) {
        commentsFragment.append(createCommentTemplate(allComments[i]));
      }

      if (allComments.length <= currentCommentsCount) {
        commentsDisplayedCount.textContent = allComments.length;
        loadMoreCommentsButton.classList.add('hidden');
      }
    }
  }

  commentsContainer.append(commentsFragment);
};


const onLoaderButtonClick = () => {
  commentsContainer.textContent = '';
  currentCommentsCount += COMMENTS_PER_LOAD;

  displayComments(allComments);
};


const clearComments = () => {
  commentsContainer.textContent = '';
  currentCommentsCount = COMMENTS_PER_LOAD;
  commentsDisplayedCount.textContent = currentCommentsCount;
};


loadMoreCommentsButton.addEventListener('click', onLoaderButtonClick);


export { displayComments, clearComments };
