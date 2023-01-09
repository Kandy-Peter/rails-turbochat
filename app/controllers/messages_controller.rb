class MessagesController < ApplicationController
  def create
    @message = current_user.messages.create(
      body: message_params[:body],
      room_id: params[:room_id],
      attachments: message_params[:attachments]
    )
    if @message.save
      flash[:notice] = "Message sent successfully" 
    else
      flash[:alert] = "Message failed to send"
    end
  end

  private

  def message_params
    params.require(:message).permit(:body, attachments: [])
  end
end
