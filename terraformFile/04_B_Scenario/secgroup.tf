resource "huaweicloud_networking_secgroup" "medium_secgroup" {
  name = "medium-security-group"
}

resource "huaweicloud_networking_secgroup_rule" "allow_rds" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 3306
  port_range_max    = 3306
  remote_ip_prefix  = "192.168.1.0/24" # Limited to internal network
  security_group_id = huaweicloud_networking_secgroup.medium_secgroup.id
}

resource "huaweicloud_networking_secgroup_rule" "allow_ssh" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "192.168.1.0/24" # SSH limited to internal network
  security_group_id = huaweicloud_networking_secgroup.medium_secgroup.id
}
