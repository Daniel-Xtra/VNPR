/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
/**
 * Keys used for storing data on offline db
 *
 * @export
 * @enum {string}
 */
export enum StorageKey {
  accessToken = 'accessToken',
  all_review = 'all_review',
  authPayload = 'authPayload',
  banks = 'banks',
  chatList = 'chatList',
  chats = 'chats',
  communityPosts = 'CommunityPosts',
  diaries = 'diaries',
  doctors = 'doctors',
  notifications = 'notifications',
  notificationSettings = 'notificationSettings',
  onboardingDone = 'onboardingDone',
  practice = 'practice',
  profile = 'profile',
  recentSearch = 'recentSearch',
  refreshToken = 'refreshToken',
  reportCategories = 'reportCategories',
  states = 'states',
  subscriptions = 'subscriptions',
  user = 'user',
  userbiodata = 'userbiodata',
  user_id = 'user_id',
  user_name = 'user_name',
  user_obj = 'user_obj',
  verify_mail = 'verify_mail',
  code = 'code',
}

/**
 * Keys used for emitting events using Ionic Events
 *
 * @export
 * @enum {string}
 */
export enum EventsType {
  updateUser = 'updateUser',
  updateDiary = 'updateDiary',
  updateZoneStorage = 'updateZoneStorage',
  connectSocket = 'connectSocket',
}

export enum SocketEvents {
  NEW_CONNECTION = 'connected',
  NEW_NOTIFICATION = 'new_notification',
  NEW_POST = 'new_post',
  NEW_POLL = 'new_poll',
  NEW_COMMENT = 'new_comment',
  NEW_REPLY = 'new_reply',
  VIEWED_POST = 'viewed_post',
  NEW_VOTE = 'new_vote',
  NEW_LIKE = 'new_like',
  ONLINE_STATUS = 'online_status',
  CHAT_MESSAGE = 'chat_message',
  SESSION_STATUS = 'session_status',
  SESSION_STATUS_MESSAGE = 'session_status_message',
  KEYSTROKE = 'keystroke',
  ERROR = 'connect_error',
  MESSAGE_RECEIVED = 'message_received',
  MESSAGE_READ = 'message_read',
  CONNECT = 'connect',
  PROMPT_CHAT_TRANSFER = 'prompt_chat_transfer',
  CHAT_TRANSFER_RESPONSE = 'chat_transfer_response',
  CHAT_TRANSFER = 'chat_transfer',
  TIME_OUT = 'connect_timeout',
}
