variable "burak318-vpc" {
  default = "vpc-basic"
}

variable "vpc_cidr" {
  default = "172.16.0.0/16"
}

variable "burak-subnet" {
  default = "subnet-basic"
}

variable "subnet_cidr" {
  default = "172.16.10.0/24"
}

variable "subnet_gateway" {
  default = "172.16.10.1"
}


variable "secgroup" {
  description = "Security group ID"
  type        = string
  default     = ""  
}


variable "secgroup_name" {
  description = "Security group name"
  type        = string
  default     = "my-security-group"  
}


variable "allow_cidr" {
  description = "CIDR block to allow"
  type        = string
  default     = "0.0.0.0/0"
}


variable "peer318-vpc" {
  description = "Peer VPC name"
  default     = "peer-vpc-basic"
}

variable "peer_conn_name" {
  description = "VPC peering connection name"
  default     = "my-peer-connection"
}

variable "route_destination" {
  description = "Destination CIDR for the VPC route"
  default     = "10.1.0.0/16"
}
