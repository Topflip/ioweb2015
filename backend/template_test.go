package main

import (
	"net/http"
	"strings"
	"testing"
)

func TestRenderTemplate(t *testing.T) {
	table := []*struct {
		tmpl    string
		partial bool
	}{
		{"home", false},
		{"home", true},
		{"about", false},
		{"about", true},
	}
	for i, test := range table {
		r, _ := http.NewRequest("GET", "/dummy", nil)
		c := newContext(r)
		if _, err := renderTemplate(c, test.tmpl, test.partial, nil); err != nil {
			t.Fatalf("%d: renderTemplate(%v, %q, %v): %v", i, c, test.tmpl, test.partial, err)
		}
	}
}

func TestRenderTemplateData(t *testing.T) {
	defer preserveConfig()()
	config.Env = "prod"
	config.Prefix = "/root"
	config.Google.Auth.Client = "dummy-client-id"

	req, _ := http.NewRequest("GET", "/about", nil)
	c := newContext(req)

	data := &templateData{
		OgImage: "some-image.png",
		Desc:    "dummy description",
	}
	out, err := renderTemplate(c, "about", false, data)
	if err != nil {
		t.Fatalf("renderTemplate(about, false): %v", err)
	}
	sout := string(out)

	subs := []string{
		`window.ENV = "prod"`,
		`window.PREFIX = "/root"`,
		`<meta property="og:image" content="/root/images/some-image.png">`,
		`<meta property="og:description" content="dummy description">`,
		`google-signin clientId="dummy-client-id"`,
	}

	for _, s := range subs {
		if !strings.Contains(sout, s) {
			t.Errorf("%s doesn't contain %s", out, s)
		}
	}
}
