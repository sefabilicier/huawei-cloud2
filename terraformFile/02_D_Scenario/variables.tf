variable "performance_level" {default = "low"}
variable "vpc_id" {default = "01a307b0-d8fa-4888-8082-d899abf03d1c"}
variable "subnet_id" {default = "ba20153e-2238-4b8a-9945-dc528d77a41b"}
variable "postgreSQL_password" {default = "SecureP@ssw0rd!"}
#variable "key_name" {default = ""}

variable "my_keypair" {
  default = "HqwyTlp9ZtKnbhg1+iCUjxESG1jNeB64HeJ0Ag4LjRQ"
}

variable "secgroup_name" {
  default = "default"
}
