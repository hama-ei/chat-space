# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index, unique: true|
|email|string|null: false|
|encrypted_password|string|null: false|
|reset_password_token|string||
|reset_password_sent_at|datetime||
|remember_created_at|datetime||
|created_at|timestamp|null: false|
|updated_at|timestamp|null: false|

### Association
- has_many :groups, through: :group_users
- has_many :group_users
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|created_at|timestamp|null: false|
|updated_at|timestamp|null: false|

### Association
- has_many :users, through: :group_users
- has_many :group_users
- has_many :messages

## group_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|created_at|timestamp|null: false|

### Association
- belongs_to :group
- belongs_to :user
