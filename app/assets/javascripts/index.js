$(function() {
  function appendUser(user) {
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}", data-user-name="${user.name}">追加</a>
              </div>`

    $("#user-search-result").append(html);
  };

  function appendErrMsgToHTML(msg) {
    var html = `<p>
                  <div class="chat-group-user clearfix">${ msg }</div>
                </p>`
    $("#user-search-result").append(html);
  };

  function changeUser(user_id,user_name) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value="${user_id}">
                <p class='chat-group-user__name'>${user_name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
              </div>`

    $("#chat-group-user").append(html);
  };

  $(".chat-group-form__input").on("keyup", function() {
    var input = $(".chat-group-form__input").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
   .done(function(users) {
    $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
         appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
   .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click', '.user-search-add', function(){
    $(this).parent().remove();
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).attr('data-user-name');
     changeUser(user_id,user_name);
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});

