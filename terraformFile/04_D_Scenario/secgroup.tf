resource "huaweicloud_networking_secgroup" "example_security_group" {
  name = "example-security-group"
}

resource "huaweicloud_networking_secgroup_rule" "example_allow_rds" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 3306
  port_range_max    = 3306
  security_group_id = huaweicloud_networking_secgroup.example_security_group.id
}
