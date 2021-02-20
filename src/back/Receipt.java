package github.mebyus.farmtest;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Receipt extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            Connection con = DatabaseConnection.initializeDatabase();
            String page = request.getParameter("p");
            String size = request.getParameter("s");
            String query = "select public.receipts_json(" + page + "::int4, " + size + "::int2);";
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery(query);
            String res = "";
            while (rs.next()) {
                res = rs.getString(1);

            }
            st.close();
            con.close();

            PrintWriter out = response.getWriter();
            out.println(res);
        } catch (SQLException e) {
            PrintWriter out = response.getWriter();
            out.println(e.getMessage());
        } catch (ClassNotFoundException e) {
            PrintWriter out = response.getWriter();
            out.println(e.getMessage());
        }
    }
}