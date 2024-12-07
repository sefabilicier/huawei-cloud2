resource "huaweicloud_networking_secgroup" "basic_secgroup" {
  name = "basic-security-group"
}

resource "huaweicloud_networking_secgroup_rule" "allow_http" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0" # Everyone can access HTTP
  security_group_id = huaweicloud_networking_secgroup.basic_secgroup.id
}

resource "huaweicloud_networking_secgroup_rule" "allow_https" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0" # Everyone can access HTTPS
  security_group_id = huaweicloud_networking_secgroup.basic_secgroup.id
}
