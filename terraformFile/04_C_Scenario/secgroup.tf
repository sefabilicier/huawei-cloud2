resource "huaweicloud_networking_secgroup" "eva_high_secgroup" {
  name = "eva-high-security-group"
}

resource "huaweicloud_networking_secgroup_rule" "eva_allow_specific_ssh" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = var.admin_ip # Only specific admin IPs
  security_group_id = huaweicloud_networking_secgroup.eva_high_secgroup.id
}

resource "huaweicloud_networking_secgroup_rule" "eva_allow_internal_services" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8080
  port_range_max    = 8080
  remote_ip_prefix  = "10.0.0.0/16" # Only internal services
  security_group_id = huaweicloud_networking_secgroup.eva_high_secgroup.id
}

resource "huaweicloud_networking_secgroup_rule" "eva_deny_all" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "icmp"  # Blocks all traffic except specific rules
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = huaweicloud_networking_secgroup.eva_high_secgroup.id
}


variable "admin_ip" {
  description = "IP address of the admin in CIDR format"
  type        = string
  default     = "192.168.1.100/32" # Burada CIDR formatını kullanıyoruz
}
