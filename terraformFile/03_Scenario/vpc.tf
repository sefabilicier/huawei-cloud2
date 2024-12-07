# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_2" {
  name = "elif_vpc"
  cidr = "192.168.0.0/16"
}


//security
resource "huaweicloud_networking_secgroup" "web_sg" {
  name = "web-sg"
}

resource "huaweicloud_networking_secgroup_rule" "allow_http" {
  direction       = "ingress"
  ethertype       = "IPv4"
  protocol        = "tcp"
  port_range_min  = 80
  port_range_max  = 80
  remote_ip_prefix = "0.0.0.0/0"
  security_group_id = huaweicloud_networking_secgroup.web_sg.id
}
