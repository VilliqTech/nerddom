package org.villiq.nerddom;

import org.springframework.boot.SpringApplication;

public class TestNerddomApplication {

	public static void main(String[] args) {
		SpringApplication.from(NerddomApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
