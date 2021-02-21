JAVAC=javac
JAR=jar
OUTDIR=./dist/WEB-INF
BACKSRC=./src/back
SERVLET_API=/home/mebyus/Downloads/apache-tomcat-10.0.2/lib/servlet-api.jar
WEBAPP_DIR=/home/mebyus/Downloads/apache-tomcat-10.0.2/webapps/farmtest

all: classes web.xml webpack

# war:
# 	$(JAR) -cf ./dist/farmtest.war *

install:
	cp --recursive ./dist/** $(WEBAPP_DIR)

webpack:
	npm run build

web.xml:
	cp $(BACKSRC)/web.xml $(OUTDIR)

classes: $(BACKSRC)/Details.java $(BACKSRC)/Receipt.java $(BACKSRC)/DatabaseConnection.java $(BACKSRC)/Estimate.java
	$(JAVAC) -cp $(SERVLET_API) -d $(OUTDIR)/classes $^

clean:
	rm --recursive dist