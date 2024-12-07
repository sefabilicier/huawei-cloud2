resource "huaweicloud_networking_secgroup" "secgroup" {
  name        = "my-security-group"
}

resource "huaweicloud_networking_secgroup_rule" "allow_rds" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 3306
  port_range_max    = 3306
  remote_ip_prefix  = var.allow_cidr
  security_group_id = huaweicloud_networking_secgroup.secgroup.id 
}