class Api::MessagesController < ApplicationController

  def index
    @messages = Message.all
    respond_to do |format|
      format.html
      format.json { @new_message = Message.where('id > ?', params[:message][:id]) } # json形式でアクセスがあった場合は、params[:message][:id]よりも大きいidがないかMessageから検索して、@new_messageに代入する
    end
  end
end
