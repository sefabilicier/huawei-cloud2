resource "huaweicloud_vpc" "vpc_4" {
  name = "burak318-vpc"
  cidr = "172.16.0.0/12"
}


resource  "huaweicloud_vpc" "peer_vpc" {
  name = "peer318-vpc"
  cidr = "10.1.0.0/16" 
}




