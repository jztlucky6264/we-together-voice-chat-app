class UserDto {
  id;
  phone;
  activated;
  createdAt;

  constructor(user) {
    this.id = user._id;
    this.phone = user.phone;
    this.createdAt = user.createdAt;
    this.activated = user.activated;
  }
}

module.exports = UserDto;
