# Creating VPC (Virtual Private Cloud) 
resource "huaweicloud_vpc" "vpc_1" {
  name = "sefa_vpc"
  cidr = "192.168.0.0/16"
}


resource "huaweicloud_networking_secgroup" "mysecgroup" {
  name        = "mysecgroup"
  description = "Security group with high security rules"
}

resource "huaweicloud_networking_secgroup_rule" "ssh" {
  security_group_id = huaweicloud_networking_secgroup.mysecgroup.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  ports              = 22                # Correct argument
  remote_ip_prefix  = "203.0.113.0/24"  # Trusted IP address range
}

resource "huaweicloud_networking_secgroup_rule" "postgresql" {
  security_group_id = huaweicloud_networking_secgroup.mysecgroup.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  ports             = 5432              # Correct argument
  remote_ip_prefix  = "192.168.2.0/24"  # Private subnet CIDR
}

resource "huaweicloud_networking_secgroup_rule" "http" {
  security_group_id = huaweicloud_networking_secgroup.mysecgroup.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  ports              = 80                # Correct argument
  remote_ip_prefix  = "192.168.1.0/24"  # Public subnet CIDR
}

resource "huaweicloud_networking_secgroup_rule" "https" {
  security_group_id = huaweicloud_networking_secgroup.mysecgroup.id
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  ports              = 443               # Correct argument
  remote_ip_prefix  = "192.168.1.0/24"  # Public subnet CIDR
}

